export const PARTS_KIT_SOURCE = 'parts-kit';

export enum Sources {
  Iframe = 'parts-kit-iframe',
  App = 'parts-kit-app',
}

export enum MessageType {
  Documentation = 'docs'
}

export interface IframeMessage {
  source: Sources,
  message: MessageType,
  payload: string // TODO something better? It would be awesome to get a fully typed object when parsing message type
}

const isObject = (object: any): boolean => {
  return typeof object === 'object' &&
  !Array.isArray(object) &&
  object !== null
}

export function instanceOfIframeMessage(object: any): object is IframeMessage {
  return isObject(object) && 'source' in object && Object.values(Sources).includes(object.source)
}
