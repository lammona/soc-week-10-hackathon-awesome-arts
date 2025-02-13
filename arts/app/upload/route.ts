import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // ⚠️ The below code is for App Router Route Handlers only
  const blob = await put(filename, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}







// import { put } from '@vercel/blob';
 
// export async function PUT(request: Request) {
//   const form = await request.formData();
//   const file = form.get('file') as File;
//   const blob = await put(file.name, file, { access: 'public' });
 
//   return Response.json(blob);
// }