/*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
