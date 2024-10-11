const { createLogger, format, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

// Create the logger instance
const logger = createLogger({
  level: 'info', // Default logging level
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss', // Custom timestamp format
    }),
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
    new DailyRotateFile({
      filename: 'debug/%DATE%/server.log',
      datePattern: 'MM-DD-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      level: 'error', // Only log errors to this file
    }),
    new DailyRotateFile({
      filename: 'debug/%DATE%/client.log',
      datePattern: 'MM-DD-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
    }),
  ],
})

// Test logging
const testLogging = () =>
{
  logger.info('This is an info log message.', { userId: 123, action: 'testAction' })
  logger.warn('This is a warning log message.', { userId: 123 })
  logger.error('This is an error log message.', { userId: 123, error: new Error('Test error') })
}

// Execute the test
testLogging()
console.log('Test logging executed. Check the debug folder for logs.')