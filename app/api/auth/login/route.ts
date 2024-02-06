import { API_ENDPOINTS } from "../../../../constants/data";
import axios, { AxiosError } from "axios"
import { Request } from "express"
import { NextResponse } from "next/server";


interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

export async function POST(req: LoginRequest) {
    const { email, password } = req.body;
    console.log(email, password, 'email, password')
    const payload = {
        email,
        password
    };

    try{
        const user = await axios.post(API_ENDPOINTS.LOGIN, payload);
        console.log(user.data)
        return NextResponse.json(user.data, { status: 200 });
    
    } catch (e) {
        const error  =  e as AxiosError;
        console.log(error.message, 'error')
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
