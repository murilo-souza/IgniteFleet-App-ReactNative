import { TouchableOpacityProps } from 'react-native'
import { Container, Loading, Title } from './styles'

type ButtonProps = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <Container activeOpacity={0.7} {...rest} disabled={isLoading}>
      {isLoading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  )
}
