import { BehaviorSubject } from 'rxjs';

export interface StoreInterface<T> {
  /**
   * Gets a state subject to listen to.
   */
  get(): BehaviorSubject<T>;

  /**
   * Sets a global/specific state value (object).
   * @param object The object to set as state value.
   */
  set(object: Partial<T>): void;
}
