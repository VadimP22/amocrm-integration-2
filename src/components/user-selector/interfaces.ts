export type ItemType = "user" | "group"

export interface UserSelectorItem {
    type: ItemType
    text: string
    key: string
}