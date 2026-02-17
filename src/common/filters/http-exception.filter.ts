import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status: number = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = exception.message;

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const responseMessage = (
        exceptionResponse as { message: string | string[] }
      ).message;
      message = Array.isArray(responseMessage)
        ? responseMessage.join(', ')
        : responseMessage;
    }

    this.logger.error(
      `Http Status: ${status} Error Message: ${JSON.stringify(message)}`,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
