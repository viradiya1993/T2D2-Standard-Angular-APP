export class AppConst {
    public static trimPattern = /^\s+|\s+$/gm; // pattern for trimming
    public static pageSize = 10;
    public static pageSizeOptions: number[] = [10, 25, 100];
    public static image = 'assets/img/user.png';
    public static noImage = 'assets/img/noimage.png';
    public static noProjectImage = 'assets/img/cityscape.svg'
    public static selectImg = 'assets/img/select_img.png';
    public static pinImg = 'assets/img/ic_marker_pin.png';
    public static deleteMessage = 'Do you confirm the deletion of this data';
    public static emailValidationPattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*(\+[a-zA-Z0-9-]+)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;  // email validation pattern
    public static pngiconx = 19;
    public static pngicony = 35;
    public static inspectordeleteMessage = 'Are you sure you want to delete Inspector ?';
    public static projectdeleteMessage = 'Are you sure you want to delete Project ?';
    public static drawingdeleteMessage = 'Are you sure you want to delete Drawing ?';
    public static imagedeleteMessage = 'Are you sure you want to delete Image ?';
    public static reportdeleteMessage = 'Are you sure you want to delete Report ?';
    public static stageWidth = 700;
    public static stageHeight = 600;

}
