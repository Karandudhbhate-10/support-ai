declare global {
  var mongoose: {
    conn: connection | null;
    promise: promises<connection> | null;
  };
}

export {};
