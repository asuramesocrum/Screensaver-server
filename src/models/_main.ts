import {UserModel} from "./User";
import {RoleModel} from "./Role";
import {GroupModel} from "./Group";
import {FileModel} from "./File";
import {TokenModel} from "./Token";
import {ConfirmationModel} from "./Confirmation";
import {UserOnRoleModel} from "./ManyToMany/UserOnRole"
import {ClubOnLinkModel} from "./ManyToMany/ClubOnLink";
import {LinkModel} from "./Link";
import {GalleryModel} from "./Gallery";
import {ClubModel} from "./Club";
import {ClubOnGalleryModel} from "./ManyToMany/ClubOnGallery";
import {TimetableModel} from "./Timetable";

class ModelController {
  private readonly models: any[];
  private readonly modelsManyToMany: any[];

  constructor() {
    this.models = [
      UserModel,
      RoleModel,
      GroupModel,
      FileModel,
      TokenModel,
      ConfirmationModel,
      ClubModel,
      LinkModel,
      GalleryModel,
      TimetableModel,
    ]
    this.modelsManyToMany = [
      UserOnRoleModel,
      ClubOnLinkModel,
      ClubOnGalleryModel,
    ]
  }

  getAll() {
    return [...this.models, ...this.modelsManyToMany]
  }
}

export default new ModelController()

