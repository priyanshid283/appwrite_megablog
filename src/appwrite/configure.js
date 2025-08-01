
import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Role } from "appwrite";
import { Permission } from 'appwrite';
export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            if(!slug) throw new
            error("missing slug in create post")
            if(!userId) throw new
            error("missing uer id in create post")

            const permission = [
                Permission.read(Role.any()),
                 Permission.update(Role.users(userId)),
                  Permission.delete(Role.users(userId)),
            ];
 return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            Permissions
            )
        }
        catch(error){
            console.log("appwrite service creat post :: error ",error?.msg || error)
            console.log("code",error?.code,"response:",error?.responce);
            return null;
        }
    }
    /*async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
*/
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
             console.log("slug in getpost" , slug)
            const res = await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug            
            );
          return res;
            }
         catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBUCKETID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBUCKETID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFileView(fileId){
        if(!fileId) return " ";
        return (
             this.bucket.getFileView( conf.appwriteBUCKETID, fileId)
)
    }
}


const service = new Service()
export default service