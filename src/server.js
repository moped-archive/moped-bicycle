import * as path from 'path';
import {loadSchemaFromFiles, createBicycleMiddleware} from 'bicycle/server';
import MemoryStore from 'bicycle/sessions/memory';

function createMiddleware(sessionStore = new MemoryStore()) {
  let BASE_PATH = path.resolve('./build/backend');
  if (process.env.NODE_ENV !== 'production') {
    BASE_PATH = path.resolve('./src/server');
  }
  const schema = loadSchemaFromFiles(BASE_PATH + '/schema');
  const middleware = createBicycleMiddleware(schema, sessionStore, require(BASE_PATH + '/get-context.js').default);
  return (req, res, next) => {
    if (req.path === '/bicycle') {
      return middleware(req, res, next);
    } else {
      return next();
    }
  };
}

export default createMiddleware;
