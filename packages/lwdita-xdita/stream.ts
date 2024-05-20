/**
 * A simple output stream interface.
 */
interface SimpleOutputStream<T> {
  /**
   * Emit an item to the output stream.
   * 
   * @param item - the item to emit to the output stream.
   */
  emit(item: T): void;

  /**
   * Closes the output stream after all items have been emitted.
   */
  close(): void;

  /**
   * Returns a value indicating if the stream has been closed.
   *
   * @returns true if the stream has been closed, false otherwise.
   */
  isClosed(): boolean;
}

/**
 * A simple text output stream interface.
 */
export interface TextSimpleOutputStream extends SimpleOutputStream<string> {}

/**
 * An implementation of a TextSimpleOutputStream that just collects
 * all of the items into an in-memory buffer.
 * 
 * The string items are appended to an in-memory buffer
 * until the stream is closed. The content of the buffer
 * can be retrieved by calling `getText()`.
 */
export class InMemoryTextSimpleOutputStreamCollector implements TextSimpleOutputStream {
  private buffer = '';
  private closed = false;

  emit(item: string): void {
    if (!this.closed) {
      this.buffer += item;
    }
  }

  close(): void {
    this.closed = true;
  }

  isClosed(): boolean {
    return this.closed;
  }

  /**
   * Get the content of the in-memory buffer.
   * 
   * @returns the content of the in-memory buffer.
   */
  getText(): string {
    return this.buffer;
  }
}
