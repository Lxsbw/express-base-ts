/*
 * @Author: zhixiong.fu
 * @Date: 2020-12-25 13:51:40
 * @Last Modified by: zhixiong.fu
 * @Last Modified time: 2020-12-25 16:38:08
 */

import { ApiModel, ApiModelProperty } from '@fiwoo/swagger-express-ts';

@ApiModel({
  description: '手机参数(查询结果)',
  name: 'MobilePhoneQuery'
})
export class MobilePhoneQuery {
  @ApiModelProperty({
    description: 'id'
  })
  public _id?: string;

  @ApiModelProperty({
    description: '手机型号'
  })
  public model_name?: string;

  @ApiModelProperty({
    description: '尺寸'
  })
  public size?: string;

  @ApiModelProperty({
    description: '规格'
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
  })
  public seria_number?: string;

  [k: string]: any;
}

@ApiModel({
  description: '创建手机-输入参数',
  name: 'MobilePhoneSaveIn'
})
export class MobilePhoneSaveIn {
  public _id?: string;

  @ApiModelProperty({
    description: '手机型号',
    required: true,
    example: 'apple'
  })
  public model_name?: string;

  @ApiModelProperty({
    description: '尺寸',
    required: true,
    example: '5.7'
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
    description: '空间',
    example: ''
  })
  public rom?: number;

  @ApiModelProperty({
    description: '序列号'
    // example: [{ website: 'http://xcatliu.com' }]
    // format: SwaggerDefinitionConstant.Definition.Property.Type.STRING
  })
  public seria_number?: string;
}

@ApiModel({
  description: '创建手机-输出参数',
  name: 'MobilePhoneSaveOut'
})
export class MobilePhoneSaveOut {
  @ApiModelProperty({
    description: 'id',
    required: true
  })
  public _id?: string;

  [k: string]: any;
}

@ApiModel({
  description: '修改手机-输入参数',
  name: 'MobilePhoneModifyIn'
})
export class MobilePhoneModifyIn {
  @ApiModelProperty({
    description: 'id',
    required: true
  })
  public _id?: string;

  @ApiModelProperty({
    description: '手机型号'
  })
  public model_name?: string;

  @ApiModelProperty({
    description: '尺寸'
  })
  public size?: string;

  @ApiModelProperty({
    description: '规格'
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
  })
  public seria_number?: string;

  [k: string]: any;
}

@ApiModel({
  description: '删除手机-输入参数',
  name: 'MobilePhoneDelIn'
})
export class MobilePhoneDelIn {
  @ApiModelProperty({
    description: 'id'
    // required: true
  })
  public _id?: string;
}
