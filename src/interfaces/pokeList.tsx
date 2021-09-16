export interface PokeProp {
    selected: undefined
    dataFilter: never[]
    isCompared: boolean
    pRight: boolean
    onClickPokemons: (url: React.SetStateAction<undefined>) => void
    onCloseModal:  () => void
}