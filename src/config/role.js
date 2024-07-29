import { readonly } from "vue";

const roleData = [
    "PO_DIVISI",
    "PO_DEPARTMENT",
    "SUPERVISOR",
    "OPERATOR"
]

const role = readonly(roleData);

export default role;