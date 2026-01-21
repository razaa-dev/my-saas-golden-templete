/**
 * Mock n8n Webhook Test Endpoint
 * 
 * This API route simulates an n8n webhook endpoint for testing purposes.
 * It accepts POST requests, logs the data, and returns a mock response.
 * 
 * TODO: Replace this with actual n8n webhook calls once n8n is properly configured
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await request.json()
    
    // Log the received data for debugging
    console.log('🔄 Mock n8n Webhook received data:', {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      body: body
    })

    // Simulate processing time (like a real workflow)
    await new Promise(resolve => setTimeout(resolve, 100))

    // Mock n8n workflow response
    const mockResponse = {
      success: true,
      executionId: `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      workflowId: body.workflowId || 'test-workflow',
      message: 'Mock workflow executed successfully',
      timestamp: new Date().toISOString(),
      receivedData: body,
      processedData: {
        ...body,
        processed: true,
        processedAt: new Date().toISOString(),
        mockResult: 'This is a simulated n8n workflow response'
      }
    }

    // Return successful response
    return NextResponse.json(mockResponse, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Workflow-Status': 'completed',
        'X-Execution-Time': '100ms'
      }
    })

  } catch (error: unknown) {
    // Log the error
    console.error('❌ Mock n8n Webhook error:', error)

    // Return error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
        message: 'Mock workflow execution failed'
      },
      { status: 500 }
    )
  }
}

// Handle GET requests for endpoint information
export async function GET() {
  return NextResponse.json({
    message: 'Mock n8n Webhook Test Endpoint',
    description: 'This endpoint simulates an n8n webhook for testing purposes',
    methods: ['POST'],
    usage: {
      url: '/api/workflows/test',
      method: 'POST',
      contentType: 'application/json',
      example: {
        workflowId: 'test-workflow',
        data: {
          email: 'user@example.com',
          action: 'user_signup'
        }
      }
    },
    note: 'This is a mock endpoint. Replace with actual n8n webhook URL in production.'
  })
}