import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface File {
  'content' : Uint8Array | number[],
  'contentType' : string,
  'name' : string,
}
export interface _SERVICE {
  'getFile' : ActorMethod<[string], [] | [File]>,
  'listFiles' : ActorMethod<[], Array<string>>,
  'uploadFile' : ActorMethod<
    [string, Uint8Array | number[], string],
    undefined
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
