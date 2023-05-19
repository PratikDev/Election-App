import { Client, Account, Databases } from "appwrite";

const client = new Client();

const endPoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

client.setEndpoint(endPoint).setProject(projectID);

export const account = new Account(client);

export const databases = new Databases(client);
