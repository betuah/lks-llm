import { NextResponse } from "next/server";
interface BodyTypes {
   status: string;
   message: string;
   data?: any;
   errField?: any;
}

export const ResponseBody = (body: BodyTypes, status: number) => {
   return NextResponse.json(body, {
      headers: {
         "content-type": "application/json",
      },
      status: status,
   })
}

