import { PepperMintException } from "../../src/exceptions/exception";

const exc = new PepperMintException({
    message : "Helo",
    suggestion : "LOL",
    line : 8,
    file : "d"
}).throwException(true)