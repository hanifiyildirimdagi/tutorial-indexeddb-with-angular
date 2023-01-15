export interface TableConfig {
  tableName: string;
  primaryKey: string | undefined;
  autoIncrament?: boolean;
}

export class IndexedDb<T> {
  private readonly NotConnected = new Error('Not Connected');

  private _connection?: IDBDatabase;
  private _connected: boolean = false;
  private _transactionIsInProggress: boolean = false;

  public get Connected(): boolean {
    return this._connected;
  }
  public get TransactionIsInProggress(): boolean {
    return this._transactionIsInProggress;
  }

  private readonly _db: IDBFactory;

  public static CheckSupport(): boolean {
    return !window.indexedDB ? false : true;
  }

  constructor(private _dbName: string, private _config: TableConfig) {
    if (_config.autoIncrament === undefined) _config.autoIncrament = false;

    if (!IndexedDb.CheckSupport())
      throw new Error('This browser cannot support IndexedDB');
    this._db = window.indexedDB;
  }

  public async Connect(): Promise<void> {
    let connect = this._db.open(this._dbName);
    return new Promise((resolve, reject) => {
      connect.onerror = (ev: Event) => {
        this._connected = false;
        this._connection = undefined;
        console.error('Connection failed. ', ev);
        reject(ev);
      };


      connect.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
        this._connected = true;
        this._connection = connect.result;

        this._connection.createObjectStore(this._config.tableName, {
          keyPath: this._config.primaryKey,
          autoIncrement: this._config.autoIncrament,
        });
        console.info('Migrated', ev);
        resolve();
      };

      connect.onsuccess = () => {
        this._connected = true;
        this._connection = connect.result;
        console.info('Connected');
        resolve();
      };
    });
  }

  public async Add(item: T): Promise<void> {
    if (!this.Connected || !this._connection) return;
    let transaction = this._connection.transaction(
      this._config.tableName,
      'readwrite'
    );
    let storage = transaction.objectStore(this._config.tableName);
    return new Promise((resolve, reject) => {
      var req = storage.add(item);
      req.onsuccess = (ev: Event) => {
        resolve();
      };
      req.onerror = (ev: Event) => {
        reject(ev);
      };
    });
  }

  public async GetAll(): Promise<T[]> {
    if (!this.Connected || !this._connection) throw new Error('Not connected');
    const request = this._connection
      .transaction(this._config.tableName)
      .objectStore(this._config.tableName)
      .getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(request.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  public async Get(key: string | number): Promise<T> {
    if (!this.Connected || !this._connection) throw this.NotConnected;
    let transaction = this._connection.transaction(this._config.tableName);
    let storage = transaction.objectStore(this._config.tableName);

    const request = storage.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  public async Update(item: T) {
    if (!this.Connected || !this._connection) return;
    let transaction = this._connection.transaction(
      this._config.tableName,
      'readwrite'
    );
    let storage = transaction.objectStore(this._config.tableName);

    const request = storage.put(item);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  public async Delete(key: string | number): Promise<void> {
    if (!this.Connected || !this._connection) throw this.NotConnected;
    let transaction = this._connection.transaction(
      this._config.tableName,
      'readwrite'
    );
    let storage = transaction.objectStore(this._config.tableName);
    const request = storage.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  public async Count(): Promise<number> {
    if (!this.Connected || !this._connection) throw this.NotConnected;
    let transaction = this._connection.transaction(this._config.tableName);
    let storage = transaction.objectStore(this._config.tableName);
    const request = storage.count();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  public async Any(): Promise<boolean> {
    if (!this.Connected || !this._connection) throw this.NotConnected;
    return (await this.Count()) > 0;
  }

  public async BulkAdd(items: T[]): Promise<void> {
    if (!this.Connected || !this._connection) throw this.NotConnected;
    let transaction = this._connection.transaction(
      this._config.tableName,
      'readwrite'
    );
    let storage = transaction.objectStore(this._config.tableName);
    for (let item of items) {
      storage.put(item);
    }
    transaction.commit();
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  public async GetAllKeys(): Promise<any[]> {
    if (!this.Connected || !this._connection) throw this.NotConnected;
    const transaction = this._connection.transaction(this._config.tableName);
    const storage = transaction.objectStore(this._config.tableName);
    const request = storage.getAllKeys();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  public async DeleteDatabase(): Promise<void> {
    this._connection?.close();
    const request = indexedDB.deleteDatabase(this._dbName);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e);
    });
  }
}
