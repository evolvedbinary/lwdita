/**
 * A simple stream interface.
 */
interface SimpleStream<T> {
  /**
   * Emit an event to the stream.
   * 
   * @param event the event to emit to the stream.
   */
  emit(event: T): void;

  /**
   * Closes the stream after all events have been emitted.
   */
  close(): void;
}
  
/**
 * A simple text stream interface.
 */
export interface SimpleTextStream extends SimpleStream<string> {}

/**
 * An implementation of a SimpleTextStream that just collects
 * all of the events into an in-memory buffer.
 * 
 * The string events are appended to an in-memory buffer
 * until the stream is closed. The content of the buffer
 * can be retrieved by calling `getText()`.
 */
export class InMemorySimpleTextStreamCollector implements SimpleTextStream {
  private buffer = '';
  private closed = false;
  
  emit(event: string): void {
    if (!this.closed) {
      this.buffer += event;
    }
  }
  
  close(): void {
    this.closed = true;
  }
  
  /**
   * Get the content of the in-memory buffer.
   * 
   * @return the content of the in-memory buffer.
   */
  getText(): string {
    return this.buffer;
  }
}
