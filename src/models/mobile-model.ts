/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-25 13:51:40
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-25 16:38:08
 */

import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
  description: 'MobilePhone description',
  name: 'Mobile'
})
export class MobileModel {
  @ApiModelProperty({
    description: '内存',
    example: [4, 8, 16, 32]
  })
  public ram?: number;

  @ApiModelProperty({
    description: '序列号',
    required: true
  })
  public seria_number?: string;
}
