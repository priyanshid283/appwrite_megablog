import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
       apiKey='qlu2ks0naol58p0oqvep9amiufockstcl9eq20lei4r19hin'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            valid_elements:'*[*]',
            height: 500,
            menubar: true,
         
            plugins: [
 'emoticons', 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
  'insertdatetime', 'media', 'table', 'help', 'wordcount',
  'format' 
],
            
            toolbar:
    'undo redo | formatselect fontselect fontsizeselect | ' +
    'bold italic underline strikethrough | forecolor backcolor | ' +
    'alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | removeformat | help',
  content_style:
    ` body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }
  span[style*="text-decoration: underline"] { text-decoration: underline; }`,

 font_family_formats:
    'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Tahoma=tahoma,arial; Times New Roman=times new roman,times; Verdana=verdana,geneva;',
  font_size_formats:
    '8pt 10pt 12pt 14pt 18pt 24pt 36pt'
}}
        
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}