import { writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import { join } from "path";
import { cwd } from "process";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as unknown as File;

    if (!file) {
        return new Response(JSON.stringify({ error: "Please provide a file" }), {
            status: 400,
        });
    }

   

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const normalizeName = `${Date.now()}-${file.name.split(' ').join('-')}`;
    
        const path = join(cwd(),'public','uploads', normalizeName);
    
        await writeFile(path, buffer);

        const imageUrl = `/uploads/${normalizeName}`.toString();
        console.log(imageUrl)

        return new Response(JSON.stringify({ path:imageUrl,success:"Image uploaded successfully" }), {
            status: 200,
        });
    } catch (error: unknown) {
        console.error(error);
        return new Response(JSON.stringify({ error}), {
            status: 500,
        });
        
    }
}