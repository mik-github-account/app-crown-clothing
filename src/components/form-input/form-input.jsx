import { FromInputLabel, Input, Group } from './form-input.style.js'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && (
                <FromInputLabel shrink={otherProps.value.length}>
                    {label}
                </FromInputLabel>
            )}
        </Group>
    );
}

export default FormInput;