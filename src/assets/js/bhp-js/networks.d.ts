declare const _default: {
    MainNet: {
        Name: string;
        ProtocolConfiguration: {
            Magic: number;
            AddressVersion: number;
            StandbyValidators: string[];
            SeedList: string[];
            SystemFee: {
                EnrollmentTransaction: number;
                IssueTransaction: number;
                PublishTransaction: number;
                RegisterTransaction: number;
            };
        };
        ExtraConfiguration: {
            bhpDB: string;
            bhpscan: string;
        };
    };
    TestNet: {
        Name: string;
        ProtocolConfiguration: {
            Magic: number;
            AddressVersion: number;
            StandbyValidators: string[];
            SeedList: string[];
            SystemFee: {
                EnrollmentTransaction: number;
                IssueTransaction: number;
                PublishTransaction: number;
                RegisterTransaction: number;
            };
        };
        ExtraConfiguration: {
            bhpDB: string;
            bhpscan: string;
        };
    };
};
export default _default;
//# sourceMappingURL=networks.d.ts.map