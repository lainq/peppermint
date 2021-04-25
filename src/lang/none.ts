export class PepperMintNull {
  public readonly noneType: null = null;

  constructor() {}

  /**
   * @returns {PepperMintNull}
   */
  public static none = (): PepperMintNull => {
    return new PepperMintNull();
  };

  /**
   * @returns {PepperMintNull}
   */
  private static convert = (convertElement: any): PepperMintNull => {
    return PepperMintNull.none();
  };
}
