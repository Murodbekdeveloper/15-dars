import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(private reflector: Reflector) {}
    async transform(value: any, metadata: ArgumentMetadata) {
        return value
    }
}