export interface Payers {
  name: string;
}

/**
 * The local/specific book state model.
 */
export interface PayersState {
  payers: Payers[];
}
