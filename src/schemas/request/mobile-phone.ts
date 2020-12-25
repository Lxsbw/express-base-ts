/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-25 13:51:40
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-25 16:38:08
 */

import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
  description: '创建手机参数',
  name: 'MobilePhoneAdd'
})
export class MobilePhoneAdd {
  @ApiModelProperty({
    description: '手机型号',
    required: true
  })
  public model_name?: string;

  @ApiModelProperty({
    description: '尺寸',
    required: true
  })
  public size?: string;

  @ApiModelProperty({
    description: '规格',
    required: true
  })
  public spec?: string;

  @ApiModelProperty({
    description: '内存'
  })
  public ram?: number;

  @ApiModelProperty({
    description: '空间'
  })
  public rom?: number;

  @ApiModelProperty({
    description: '序列号'
    // example: [{ website: 'http://xcatliu.com' }]
    // format: SwaggerDefinitionConstant.Definition.Property.Type.STRING
  })
  public seria_number?: string;

  @ApiModelProperty({
    description: '测试'
  })
  public tests?: string;
}
