import styled from 'styled-components'

export const Outer = styled.div`
margin: auto;
background: papayawhip;
`

export const Inner = styled.div`
max-width: 800px;
margin: auto;
padding: 4em;
`

export const Center = styled.div`
text-align: center;
`

export const MainTitle = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`

export const SubTitle = styled.h2`
font-size: 1.0em;
text-align: center;
color: palevioletred;
`

export const LinkPremiers = styled.a`
color: palevioletred;
font-weight: bold;
`

export const TableLink = styled.a`

`

export const SearchButton = styled.button`
/* Adapt the colors based on primary prop */
background: ${props => props.primary ? 'palevioletred' : 'white'};
color: ${props => props.primary ? 'white' : 'palevioletred'};

font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
`

export const SearchInput = styled.input`
width: 60%;
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || 'palevioletred'};
background: white;
border: none;
border-radius: 3px;
`
