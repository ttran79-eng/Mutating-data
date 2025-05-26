"use server";
import { redirect } from "next/navigation";
import { storePost } from "@/lib/posts";

export async function createPost(prevState, formData){

    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');
    let errors = [];

    if(!title || title.trim().length === 0){
      errors.push("Title is required.");

    }

       if(!content || content.trim().length === 0){
        errors.push("Content is required.");
    }

       if(!image || image.size === 0){
        errors.push("Image is required.");
      
    }

    if(errors.length > 0){
      return { errors };
    }
    
    let imageUrl;

    try{
        imageUrl = await uploadImage(image);
    } catch (error){
        throw new Error(
          'Image upload error, post was not created.'
        );
      }

    // The const title is named the same as the database so we can use the shortcut here...
    // Currently no path to image
    await storePost({
      imageUrl: imageUrl,
      title,
      content,
      userId: 1
    });

    redirect('/feed');

  }