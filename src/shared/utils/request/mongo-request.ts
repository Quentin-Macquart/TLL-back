import { MongoClient, Db, Collection, ObjectId, Document, FindOneAndUpdateOptions } from 'mongodb';
import { logger, errorLogger } from '@app/shared/utils/logger';

/**
 * A generic MongoDB API class for performing CRUD operations on a collection.
 *
 *
 */
export class MongoDbApi {
  private client: MongoClient;

  private db!: Db;

  private collection: Collection<Document>;

  /**
   * Creates an instance of MongoDbApi.
   *
   * @param {string} dbUrl - The MongoDB connection URL.
   * @param {string} dbName - The name of the database.
   * @param {string} collectionName - The name of the collection.
   */
  constructor(dbUrl: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(dbUrl);
    this.collection = this.client.db(dbName).collection(collectionName);
  }

  /**
   * Connects to the MongoDB database.
   *
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db();
      logger.info('Connexion with the database has been etablished');
    } catch (error) {
      errorLogger.error('Connection has not be successfully done');
      throw error;
    }
  }

  /**
   * Disconnects from the MongoDB database.
   *
   * @returns {Promise<void>} A promise that resolves when the connection is closed.
   */
  async disconnect(): Promise<void> {
    await this.client.close();
  }

  /**
   * Inserts a document into the collection.
   *
   * @param {Document} data - The document to insert.
   * @returns {Promise<Document>} A promise that resolves with the inserted document.
   */
  async create(data: Document): Promise<any> {
    await this.connect();
    const result = await this.collection.insertOne(data);
    return result.insertedId;
  }

  /**
   * Retrieves all documents from the collection.
   *
   * @returns {Promise<Document[]>} A promise that resolves with an array of documents.
   */
  async read(): Promise<any> {
    await this.connect();
    const result = await this.collection.find().toArray();
    return result;
  }

  /**
   * Retrieve a single document by its ID.
   *
   * @param {string} id - The ID of the document to retrieve.
   * @returns {Promise<Document | null>} - The retrieved document or null if not found.
   */
  async readOne(id: string): Promise<any | null> {
    await this.connect();
    const objectId = new ObjectId(id);
    const result = await this.collection.findOne({ _id: objectId });

    return result || null;
  }

  /**
   * Updates a document in the collection by ID.
   *
   * @param {string} id - The ID of the document to update.
   * @param {Partial<T>} data - The partial data to update the document with.
   * @returns {Promise<Document | null>} A promise that resolves with the updated document or null if not found.
   */
  async update(id: string, data: Partial<Document>): Promise<any | null> {
    await this.connect();
    const objectId = new ObjectId(id);
    const customOptions = { returnOriginal: false } as FindOneAndUpdateOptions;
    const result = await this.collection.findOneAndUpdate({ _id: objectId }, { $set: data }, customOptions);
    if (result !== null) {
      return result.value;
    }
    return null;
  }

  /**
   * Deletes a document from the collection by ID.
   *
   * @param {string} id - The ID of the document to delete.
   * @returns {Promise<void>} A promise that resolves when the document is deleted.
   */
  async delete(id: string): Promise<void> {
    await this.connect();
    const objectId = new ObjectId(id);
    await this.collection.deleteOne({ _id: objectId });
  }
}
