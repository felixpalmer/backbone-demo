class GoatsController < ApplicationController
  # GET /goats
  # GET /goats.json
  def index
    @goats = Goat.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @goats }
    end
  end

  # GET /goats/1
  # GET /goats/1.json
  def show
    @goat = Goat.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @goat }
    end
  end

  # GET /goats/new
  # GET /goats/new.json
  def new
    @goat = Goat.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @goat }
    end
  end

  # GET /goats/1/edit
  def edit
    @goat = Goat.find(params[:id])
  end

  # POST /goats
  # POST /goats.json
  def create
    @goat = Goat.new(params[:goat])

    respond_to do |format|
      if @goat.save
        format.html { redirect_to @goat, notice: 'Goat was successfully created.' }
        format.json { render json: @goat, status: :created, location: @goat }
      else
        format.html { render action: "new" }
        format.json { render json: @goat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /goats/1
  # PUT /goats/1.json
  def update
    @goat = Goat.find(params[:id])

    respond_to do |format|
      if @goat.update_attributes(params[:goat])
        format.html { redirect_to @goat, notice: 'Goat was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @goat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /goats/1
  # DELETE /goats/1.json
  def destroy
    @goat = Goat.find(params[:id])
    @goat.destroy

    respond_to do |format|
      format.html { redirect_to goats_url }
      format.json { head :no_content }
    end
  end
end
