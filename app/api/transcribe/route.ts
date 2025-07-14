import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the audio URL from the request
    const body = await request.json();
    const { audio_url } = body;
    
    console.log('Received request with audio_url:', audio_url); // Debug log

    if (!audio_url) {
      return new NextResponse(
        JSON.stringify({ error: "Missing audio_url" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Make the request to your transcription service
    console.log('Making request to transcription service...'); // Debug log
    const response = await fetch("https://vs.virsteno.workers.dev/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "audio-url": audio_url,
        "assembly-ai-api-key": process.env.ASSEMBLYAI_API_KEY || '',
      } as HeadersInit,
      body: JSON.stringify({ audio_url }),
    });

    console.log('Transcription service response status:', response.status); // Debug log

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Transcription service error:', errorText);
      return new NextResponse(
        JSON.stringify({ 
          error: `Transcription service error: ${errorText}`,
          status: response.status 
        }),
        { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    console.log('Transcription service response data:', data); // Debug log
    return NextResponse.json(data);

  } catch (error) {
    console.error('API route error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal Server Error',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
