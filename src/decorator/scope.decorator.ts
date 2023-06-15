import { SetMetadata } from '@nestjs/common';
import { Scope } from '../api/post/post.entity';

export const Scopes = (...scopes: Scope[]) => SetMetadata('scopes', scopes);
