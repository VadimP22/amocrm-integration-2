export type ItemType = "user" | "group"

export interface UserAdderItem {
    type: ItemType
    text: string
    key: string
    isSelected: boolean
}