import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guard/accessToken.guard';
import { ResponseMessages } from '../enum/responseMessage';

export function Auth() {
  return applyDecorators(
    UseGuards(AccessTokenGuard),
    ApiBearerAuth('Bearer'),
    ApiUnauthorizedResponse({ description: ResponseMessages.UNAUTHORIZED }),
  );
}
