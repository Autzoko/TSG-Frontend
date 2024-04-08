<template>
  <div style="background-color: aliceblue; height: 600px">
    <el-upload
        class="upload-window"
        action="api/image-caption/save"
        :http-request="uploadFile"
        ref="upload"
        :limit="fileLimit"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :auto-upload="true"
        :headers="headers"
        drag
        multiple>
      <i class="el-icon--upload"></i>
      <div class="el-upload__text">Plase drag images or <em>upload</em> here</div>
    </el-upload>
    <div style="padding-top: 20px">
      <el-button class="btn" style="background-color: hotpink; width: 100px" @click="handleGenerate"><div style="color: white">Generate</div></el-button>
      <el-button class="btn" style="background-color: cornflowerblue; width: 100px" @click="handleReset"><div style="color: white">Reset</div></el-button>
    </div>

    <el-divider></el-divider>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fileList: [],
      fileType: ["jpeg", "jpg", "png", "bmp"],
      fileSize: 10,
      fileLimit: 10,
      headers: {"Content-Type": "multipart/form-data"},
    };
  },
  methods: {
    beforeUpload(file) {
      if(file.type != "" || file.type != null || file.type != undefined) {
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        const isLt = file.size / 1024 / 1024 < 50;
        if(!isLt) {
          this.$message.error("file can not large than 10M");
          return false;
        }
        if(this.fileType.includes(FileExt)) {
          return true;
        } else {
          this.$message.error("invalid file format");
          return false;
        }
      }
    },

    async handleRemove(file) {
      try {
        const fileIndex = this.fileList.findIndex(item => item.uid === file.uid);
        const fileId = this.fileList[fileIndex].fileId;
        console.log(fileId);
        const response = await axios.delete(`api/image-caption/delete/${fileId}`);

        if(response.status == 200) {
          this.fileList.splice(fileIndex, 1);
          this.$message.success("delete success");
        } else {
          this.$message.error("delete failed");
        }
      } catch (e) {
        this.$message.error("delete error");
      }
    },

    handleClose(i) {
      this.fileList.splice(i, 1);
      if(this.fileList.length == 0) {
        this.fileflag = true;
        this.$set(this.rules.url, 0, {
          required: true,
          validator: this.validatorUrl,
          trigger: 'blur'
        });
      }
    },

    handleExceed() {
      this.$message({
        type: 'warning',
        message: "exceed file limit"
      });
      return;
    },

    async uploadFile(item) {
      this.$message('uploading...');
      let FormDatas = new FormData();
      FormDatas.append('file', item.file);
      try {
        const response = await axios({
          method: 'post',
          url: 'api/image-caption/save',
          headers: this.headers,
          timeout: 30000,
          data: FormDatas
        });
        if(response.status === 200) {
          this.fileList.push({'uid': item.file.uid, 'fileId': response.data.fileId});
          this.$message.success("upload success");
          console.log(this.fileList);
        }
      } catch (error) {
        this.$message.error("upload error");
      }
    },

    handleSuccess() {

    }
  }
}
</script>

<style scoped>
  .upload-window {
    border: 1px dashed #ccc;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
  }
  .upload-window em {
    color: #409eff;
    cursor: pointer;
  }
</style>