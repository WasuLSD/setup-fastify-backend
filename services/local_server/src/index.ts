import { app as sale_api } from '@app/sale_api'

sale_api.listen({ port: 4000, host: '0.0.0.0' })