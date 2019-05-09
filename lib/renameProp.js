export const renameProp = (
    oldProp,
    newProp,
    { [oldProp]: old, ...others }
) => {
    return {
        [newProp]: old,
        ...others
    };
};