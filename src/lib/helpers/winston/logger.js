import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

// Create the logger instance
export const logger = createLogger({
  level: 'info', // Default logging level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Custom timestamp format
    format.errors({ stack: true }), // Include stack trace for errors
    format.splat(), // Enable string interpolation
    format.json(), // Log in JSON format
    format.printf(({ timestamp, level, message, service, error, ...meta }) =>
    {
      // Custom format for log messages
      const errorMessage = error instanceof Error ? error.message : ''
      const errorStack = error instanceof Error ? error.stack : ''
      return `${ timestamp } [${ service }] ${ level }: ${ message } ${ errorMessage } ${ errorStack } ${ Object.keys(meta).length ? JSON.stringify(meta) : '' }`
    })
  ),
  defaultMeta: { service: 'CrewSync360' }, // Default service name
  transports: [
    // Daily rotate file transport for server logs
    new DailyRotateFile({
      filename: 'debug/%DATE%/server.log', // Path to the server log file
      datePattern: 'MM-DD-YYYY', // Log files named by date
      zippedArchive: true, // Compress the log files
      maxSize: '20m', // Maximum file size
      maxFiles: '7d', // Retain log files for 7 days
      level: 'error', // Only log errors to this file
    }),
    // Daily rotate file transport for client logs
    new DailyRotateFile({
      filename: 'debug/%DATE%/client.log', // Path to the client log file
      datePattern: 'MM-DD-YYYY', // Log files named by date
      zippedArchive: true, // Compress the log files
      maxSize: '20m', // Maximum file size
      maxFiles: '7d', // Retain log files for 7 days
    }),
  ],
})

// Console logging in non-production environments
if (process.env.NODE_ENV !== 'production')
{
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(), // Colorize log output in the console
      format.simple() // Simple log format for console
    )
  }))
}

// Global error handling for uncaught exceptions
process.on('uncaughtException', (error) =>
{
  logger.error('Uncaught Exception: ', { error })
})

// Global error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) =>
{
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
})
