import * as bhpCore from "../../bhp-core/lib";
export declare const api: typeof import("../../bhp-api/lib/plugin"), brc5: typeof import("../../bhp-brc5/lib/plugin"), settings: typeof bhpCore.settings, sc: typeof bhpCore.sc, rpc: typeof bhpCore.rpc, wallet: typeof bhpCore.wallet, CONST: typeof bhpCore.CONST, u: typeof bhpCore.u, tx: typeof bhpCore.tx, logging: typeof bhpCore.logging;
declare const _default: {
    sendAsset: typeof import("../../bhp-api/lib").sendAsset;
    claimGas: typeof import("../../bhp-api/lib").claimGas;
    doInvoke: typeof import("../../bhp-api/lib").doInvoke;
    setupVote: typeof import("../../bhp-api/lib").setupVote;
    makeTransaction: typeof import("../../bhp-api/lib").makeTransaction;
    create: {
        account: (k: string) => bhpCore.wallet.Account;
        privateKey: () => string;
        signature: (tx: string, privateKey: string) => string;
        wallet: (k: bhpCore.wallet.WalletJSON) => bhpCore.wallet.Wallet;
        claimTx: () => bhpCore.tx.ClaimTransaction;
        contractTx: () => bhpCore.tx.ContractTransaction;
        invocationTx: () => bhpCore.tx.InvocationTransaction;
        stateTx: () => bhpCore.tx.StateTransaction;
        contractParam: (type: "Signature" | "Boolean" | "Integer" | "Hash160" | "Hash256" | "ByteArray" | "PublicKey" | "String" | "Array" | "InteropInterface" | "Void", value: any) => bhpCore.sc.ContractParam;
        script: typeof bhpCore.sc.createScript;
        scriptBuilder: () => bhpCore.sc.ScriptBuilder;
        deployScript: (args: any) => bhpCore.sc.ScriptBuilder;
        rpcClient: (net: string, version: string) => bhpCore.rpc.RPCClient;
        query: (req: bhpCore.rpc.RPCRequest) => bhpCore.rpc.Query;
        network: (net: Partial<bhpCore.rpc.NetworkJSON>) => bhpCore.rpc.Network;
        stringStream: (str?: string | undefined) => bhpCore.u.StringStream;
        fixed8: (i?: string | number | undefined) => bhpCore.u.Fixed8;
    };
    deserialize: {
        attribute: typeof bhpCore.tx.TransactionAttribute.deserialize;
        input: typeof bhpCore.tx.TransactionInput.deserialize;
        output: typeof bhpCore.tx.TransactionOutput.deserialize;
        script: typeof bhpCore.tx.Witness.deserialize;
        tx: typeof bhpCore.tx.Transaction.deserialize;
    };
    is: {
        address: typeof bhpCore.wallet.isAddress;
        publicKey: typeof bhpCore.wallet.isPublicKey;
        encryptedKey: typeof bhpCore.wallet.isBRC2;
        privateKey: typeof bhpCore.wallet.isPrivateKey;
        wif: typeof bhpCore.wallet.isWIF;
        scriptHash: typeof bhpCore.wallet.isScriptHash;
    };
    sign: {
        hex: typeof bhpCore.wallet.sign;
        message: (msg: string, privateKey: string) => string;
    };
    verify: {
        hex: typeof bhpCore.wallet.verify;
        message: (msg: string, sig: string, publicKey: string) => boolean;
    };
    encrypt: {
        privateKey: typeof bhpCore.wallet.encrypt;
    };
    decrypt: {
        privateKey: typeof bhpCore.wallet.decrypt;
    };
    add: {
        network: (network: bhpCore.rpc.Network, override?: boolean) => boolean;
    };
    remove: {
        network: (name: string) => boolean;
    };
    u: typeof bhpCore.u;
    CONST: typeof bhpCore.CONST;
};
export default _default;
//# sourceMappingURL=index.d.ts.map