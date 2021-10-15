import { promisify } from 'util';

export const makeDb = async() => {
  return {
    connect(connection) {
      return promisify( connection.connect )
        .call( connection );
    },
    query(connection, sql, args) {
      return promisify( connection.query )
        .call( connection, sql, args );
    },
    close(connection) {
      return promisify( connection.end ).call( connection );
    },
    beginTransaction(connection) {
      return promisify( connection.beginTransaction )
        .call( connection );
    },
    commit(connection) {
      return promisify( connection.commit )
        .call( connection );
    },
    rollback(connection) {
      return promisify( connection.rollback )
        .call( connection );
    }
  };
}

export const withTransaction = async( connection, db, callback ) => {
  try {
    await db.beginTransaction(connection);
    await callback();
    await db.commit(connection);
  } catch ( err ) {
    await db.rollback(connection);
    throw err;
  } finally {
    await db.close(connection);
  }
}