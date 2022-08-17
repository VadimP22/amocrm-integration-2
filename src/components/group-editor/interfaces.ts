
export type DifferenceType = "add" | "delete" | "rename"

export interface DifferenceItem {
    type: DifferenceType
    key: string
    previos: string
    new: string
}

export interface GroupItem {
    name: string
    key: string
}