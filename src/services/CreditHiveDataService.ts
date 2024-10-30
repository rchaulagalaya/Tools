
import axios from 'axios';
import mongoose from "mongoose";
import { config } from "../../config";
import { connectToDatabase } from '../db/connection';



export class CreditHiveDataService {

    constructor() {
        this.initialize();
    }

    async initialize() {
        try {
            await connectToDatabase();
        } catch (error) {
            throw new Error("Unable to connect to the database");
        }
    }  

    GetAllNiches = async function GetAllNiches() {
        try {
            const CSQ_API_PATH = '/niche/all'
            const responseData = await axios.get(`${config.serviceEndpoints.creditHiveServiceUrl}${CSQ_API_PATH}`);
            const response = responseData.data.data
            return response
        } catch (error) {
            console.error(`Error retrieving niches from Credit Hive API:`, error.message);
            throw error
        }
    }

}