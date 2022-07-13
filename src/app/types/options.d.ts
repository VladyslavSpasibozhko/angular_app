interface IOptionBase {
    fieldId: string;
    value: string;
    label: string;
}

interface IOption extends IOptionBase {
    changeLabel: (value: string) => void;
}
