/**
 * n8n Webhook Integration Client
 * 
 * This module provides functions to trigger n8n workflows via webhooks.
 * It handles HTTP requests to n8n webhook endpoints with proper error handling
 * and TypeScript type safety.
 */

// TypeScript types for n8n integration
export interface N8nWorkflowResponse {
  success: boolean
  data?: unknown
  error?: string
  executionId?: string
  workflowId?: string
}

export interface N8nWorkflowPayload {
  workflowId: string
  data: unknown
  [key: string]: unknown
}

export interface N8nError {
  message: string
  code?: string
  statusCode?: number
}

/**
 * Triggers an n8n workflow via webhook
 * 
 * @param workflowId - The ID of the n8n workflow to trigger
 * @param data - The data payload to send to the workflow
 * @returns Promise<N8nWorkflowResponse> - The workflow response or error
 */
export async function triggerN8nWorkflow(
  workflowId: string, 
  data: unknown
): Promise<N8nWorkflowResponse> {
  try {
    // Get n8n webhook URL from environment variables
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    
    if (!webhookUrl) {
      throw new Error('NEXT_PUBLIC_N8N_WEBHOOK_URL environment variable is not set')
    }

    // Prepare the payload
    const payload: N8nWorkflowPayload = {
      workflowId,
      data,
      timestamp: new Date().toISOString(),
      source: 'nextjs-app'
    }

    // Send POST request to n8n webhook
    const response = await fetch(`${webhookUrl}/${workflowId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-n8n-Client/1.0'
      },
      body: JSON.stringify(payload)
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`n8n workflow request failed: ${response.status} ${response.statusText}. ${errorText}`)
    }

    // Parse the response
    const result = await response.json()

    return {
      success: true,
      data: result,
      executionId: result.executionId,
      workflowId: workflowId
    }

  } catch (error: unknown) {
    console.error('n8n workflow trigger error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return {
      success: false,
      error: errorMessage,
      workflowId: workflowId
    }
  }
}

/**
 * Triggers multiple n8n workflows in parallel
 * 
 * @param workflows - Array of workflow configurations
 * @returns Promise<N8nWorkflowResponse[]> - Array of workflow responses
 */
export async function triggerMultipleWorkflows(
  workflows: { workflowId: string; data: unknown }[]
): Promise<N8nWorkflowResponse[]> {
  try {
    const promises = workflows.map(({ workflowId, data }) =>
      triggerN8nWorkflow(workflowId, data)
    )

    return await Promise.all(promises)
  } catch (error: unknown) {
    console.error('Multiple n8n workflows trigger error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return workflows.map(({ workflowId }) => ({
      success: false,
      error: errorMessage,
      workflowId: workflowId
    }))
  }
}

/**
 * Utility function to check if n8n is configured
 * 
 * @returns boolean - True if n8n webhook URL is configured
 */
export function isN8nConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
}

const n8nClient = {
  triggerN8nWorkflow,
  triggerMultipleWorkflows,
  isN8nConfigured
}

export default n8nClient