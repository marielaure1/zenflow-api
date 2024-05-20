import { Response } from 'express';

interface ResponsesProps {
    res: Response;
    path: string;
    method: string;
    code: number;
    subject: string;
    data: any;
}

export default class Responses {
    getResponse(params: ResponsesProps): Object {
        let success = false;
        let codeMessage = "";
        let action = "";
    
        if (params.code === 200 || params.code === 201) {
            success = true;
            codeMessage = "success";
        } else if (params.code.toString().startsWith("4") || params.code.toString().startsWith("5")) {
            success = false;
            switch (params.code) {
                case 404:
                    codeMessage = "not found";
                    break;
                case 405:
                    codeMessage = "method not allowed";
                    break;
                case 409:
                    codeMessage = "conflict";
                    break;
                case 422:
                    codeMessage = "unprocessable entity";
                    break;
                case 500:
                    codeMessage = "internal server error";
                    break;
                default:
                    codeMessage = "client error";
            }
        } else {
            codeMessage = "unknown error";
        }

        switch (params.method.toLowerCase()) {
            case "get":
                action = "retrieve";
                break;
            case "post":
                action = "create";
                break;
            case "put":
            case "patch":
                action = "update";
                break;
            case "delete":
                action = "delete";
                break;
            default:
                action = "client error";
        }

        const message = `${params.subject} ${action} ${success ? "with success" : `failed: ${codeMessage}, ${!success ? params.data : ""}`}`;
        console.log(`[${success ? "Success" : "Error"}] ${params.subject.toUpperCase()} > (${params.path} => code : ${params.code}, message: ${message})`);

        return params.res.status(params.code).json({
            code: params.code,
            success,
            message,
            datas: {
              [params.subject]: params.data
            }
        });
    }
}